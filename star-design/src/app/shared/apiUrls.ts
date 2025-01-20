import { environment } from './../../environments/environment';

const domain = environment.apiDomain;

export const apis = {
  userList: `${domain}/demo/users`,
  upload_file: `${domain}/home/upload_image`,
  add_course: `${domain}/home/add_course`,
  getCourses: `${domain}/home/all_course_data`,
  updateCourse: `${domain}/home/update_course_data`,
  add_course_contact: `${domain}/home/add_student_data`,
  addBatch: `${domain}/home/add_upcoming_batch`,
  getBatches: `${domain}/home/all_batches_data`,

  //Backend Node js Routes
  node_getAllcourses: domain + '/api/course',
  node_singleFileUpload: domain + '/api/upload/single',
  node_updateCourse: domain + '/api/course/update',
  node_deleteCourse: domain + '/api/course/delete',
  node_getCourseData: domain + '/api/course/data',
  node_addCourse: domain + '/api/course/create',
  node_addCourseAdvisor: domain + '/api/course-contact/create',
  node_addUpcomingBatch: domain + '/api/batch/create',
  node_getBatches: domain + '/api/batch',
  node_login: domain + '/api/auth/user/login',
  node_signup: domain + '/api/auth/user/create',
  node_contactUs: domain + '/api/support/create',
};
