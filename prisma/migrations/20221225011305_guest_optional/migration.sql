-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "suggestion" TEXT,
    "actual" TEXT,
    "potluckId" TEXT NOT NULL,
    "guestId" TEXT,
    CONSTRAINT "Dish_potluckId_fkey" FOREIGN KEY ("potluckId") REFERENCES "Potluck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Dish_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Dish" ("actual", "guestId", "id", "potluckId", "quantity", "suggestion", "type") SELECT "actual", "guestId", "id", "potluckId", "quantity", "suggestion", "type" FROM "Dish";
DROP TABLE "Dish";
ALTER TABLE "new_Dish" RENAME TO "Dish";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
