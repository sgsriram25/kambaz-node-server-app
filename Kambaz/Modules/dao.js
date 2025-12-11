import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function ModulesDao() {
  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4(), course: courseId };
    const created = await model.create(newModule);
    return created.toObject();
  }

  async function findModulesForCourse(courseId) {
    const modules = await model.find({ course: courseId }).lean();
    return modules;
  }

  async function deleteModule(courseId, moduleId) {
    const result = await model.deleteOne({ _id: moduleId, course: courseId });
    if (result.deletedCount === 0) {
      throw new Error(`Module with id ${moduleId} not found`);
    }
    return result;
  }

  async function updateModule(courseId, moduleId, moduleUpdates) {
    const updated = await model.findByIdAndUpdate(
      moduleId,
      { $set: moduleUpdates },
      { new: true }
    ).lean();
    if (!updated) {
      throw new Error(`Module with id ${moduleId} not found`);
    }
    return updated;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule
  };
}
