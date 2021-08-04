-- CreateTable
CREATE TABLE "workout_external_api" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
