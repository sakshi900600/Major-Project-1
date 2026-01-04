// utils/progressUtils.js

const STORAGE_KEY = "course_progress";

export const getProgress = (courseSlug) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  return data[courseSlug] || [];
};

export const saveProgress = (courseSlug, completedIds) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  data[courseSlug] = completedIds;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
