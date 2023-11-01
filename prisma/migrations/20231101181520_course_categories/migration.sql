-- DropIndex
DROP INDEX "Answer_choiceId_key";

-- DropIndex
DROP INDEX "Answer_questionId_key";

-- DropIndex
DROP INDEX "Answer_userId_key";

-- DropIndex
DROP INDEX "Choice_questionId_key";

-- DropIndex
DROP INDEX "Comment_lectureId_key";

-- DropIndex
DROP INDEX "Comment_userId_key";

-- DropIndex
DROP INDEX "Course_ownerId_key";

-- DropIndex
DROP INDEX "Enrollment_courseId_key";

-- DropIndex
DROP INDEX "Enrollment_userId_key";

-- DropIndex
DROP INDEX "Lecture_moduleId_key";

-- DropIndex
DROP INDEX "Module_courseId_key";

-- DropIndex
DROP INDEX "Question_quizId_key";

-- DropIndex
DROP INDEX "Quiz_moduleId_key";

-- CreateTable
CREATE TABLE "CourseCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CourseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToCourseCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToCourseCategory_AB_unique" ON "_CourseToCourseCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToCourseCategory_B_index" ON "_CourseToCourseCategory"("B");

-- AddForeignKey
ALTER TABLE "_CourseToCourseCategory" ADD CONSTRAINT "_CourseToCourseCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToCourseCategory" ADD CONSTRAINT "_CourseToCourseCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "CourseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
