import courseModel from "../models/course.model.js";

export class CourseController {
  //Create Course
  async createCourse(req, res, next) {
    try {
      const courses = req.body;

      await courseModel.insertMany(courses, { ordered: true });

      return res.status(201).json({
        success: true,
        message: "Course Added Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  //Get all courses
  async getAllCourses(req, res, next) {
    try {
      const courses = await courseModel.find(
        { isDelete: false },
        { isDelete: 0, __v: 0 }
      );
      return res.status(200).json({
        success: true,
        data: courses,
        count: courses.length,
      });
    } catch (error) {
      next(error);
    }
  }

  //Update course
  async updateCourse(req, res, next) {
    try {
      const id = req.params.id;
      const course = await courseModel.findById(id);
      if (!course) {
        return next({
          status: 404,
          success: false,
          message: "Course not found",
        });
      }
      let updatedCourse = await courseModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        success: true,
        message: "Course Updated Successfully",
        data: updatedCourse,
      });
    } catch (error) {
      next(error);
    }
  }

  //Delete Course using soft deletion

  async deleteCourse(req, res, next) {
    try {
      const id = req.params.id;
      const course = await courseModel.findById(id);
      if (!course) {
        return next({
          success: false,
          status: 404,
          message: "Course not Found",
        });
      }

      const deletedCourse = await courseModel.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Course Deleted Successfully",
        success: true,
        data: deletedCourse,
      });
    } catch (error) {
      next(error);
    }
  }

  //Get Single course data based on route
  async getCourseData(req, res, next) {
    try {
      const route = req.query.route;
      if (!route) {
        return next({
          status: 400,
          success: false,
          message: "Please provide route name",
        });
      }
      const course = await courseModel.findOne(
        {
          $and: [{ route }, { isDelete: false }],
        },
        { isDelete: 0, __v: 0 }
      );
      if (!course) {
        return next({
          status: 200,
          success: false,
          message: `Course data not found for this route : ${route}`,
        });
      }
      const background_image = await courseModel.findOne(
        { route },
        { bg_img: 1, _id: 0 }
      );
      course.bg_img = background_image?.bg_img;
      return res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }
}
