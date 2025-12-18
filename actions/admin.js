"use server";

import { serializeCarData } from "@/lib/helper";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) {
    return { authorized: false, reason: "not-logged-in" };
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return { authorized: false, reason: "not-admin" };
  }

  return { authorized: true, userId };
}

export async function getAdmin() {
  const result = await requireAdmin();
  return result;
}


export async function getAdminTestDrives({ search = "", status = "" }) {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    let where = {};

    if (status) where.status = status;

    if (search) {
      where.OR = [
        {
          car: {
            OR: [
              { make: { contains: search, mode: "insensitive" } },
              { model: { contains: search, mode: "insensitive" } },
            ],
          },
        },
        {
          user: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          },
        },
      ];
    }

    const bookings = await db.testDriveBooking.findMany({
      where,
      include: {
        car: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            phone: true,
          },
        },
      },
      orderBy: [{ bookingDate: "desc" }, { startTime: "asc" }],
    });

    return {
      success: true,
      data: bookings.map((b) => ({
        ...b,
        car: serializeCarData(b.car),
        bookingDate: b.bookingDate.toISOString(),
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching test drives:", error);
    return { success: false, error: "Failed to fetch test drives" };
  }
}


/**
 * Update test drive status
 */
export async function updateTestDriveStatus(bookingId, newStatus) {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
      "NO_SHOW",
    ];

    if (!validStatuses.includes(newStatus)) {
      return { success: false, error: "Invalid status" };
    }

    await db.testDriveBooking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    revalidatePath("/admin/test-drives");

    return { success: true };
  } catch (error) {
    console.error("Update test drive error:", error);
    return { success: false, error: "Update failed" };
  }
}


export async function getDashboardData() {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const [
      totalCars,
      availableCars,
      soldCars,
      unavailableCars,
      featuredCars,
      totalTestDrives,
      pendingTestDrives,
      confirmedTestDrives,
      completedTestDrives,
      cancelledTestDrives,
      noShowTestDrives,
    ] = await Promise.all([
      db.car.count(),
      db.car.count({ where: { status: "AVAILABLE" } }),
      db.car.count({ where: { status: "SOLD" } }),
      db.car.count({ where: { status: "UNAVAILABLE" } }),
      db.car.count({ where: { featured: true } }),
      db.testDriveBooking.count(),
      db.testDriveBooking.count({ where: { status: "PENDING" } }),
      db.testDriveBooking.count({ where: { status: "CONFIRMED" } }),
      db.testDriveBooking.count({ where: { status: "COMPLETED" } }),
      db.testDriveBooking.count({ where: { status: "CANCELLED" } }),
      db.testDriveBooking.count({ where: { status: "NO_SHOW" } }),
    ]);

    const conversionRate =
      completedTestDrives > 0
        ? (soldCars / completedTestDrives) * 100
        : 0;

    return {
      success: true,
      data: {
        cars: {
          total: totalCars,
          available: availableCars,
          sold: soldCars,
          unavailable: unavailableCars,
          featured: featuredCars,
        },
        testDrives: {
          total: totalTestDrives,
          pending: pendingTestDrives,
          confirmed: confirmedTestDrives,
          completed: completedTestDrives,
          cancelled: cancelledTestDrives,
          noShow: noShowTestDrives,
          conversionRate: Number(conversionRate.toFixed(2)),
        },
      },
    };
  } catch (error) {
    console.error("Dashboard error:", error);
    return { success: false, error: "Failed to load dashboard" };
  }
}
