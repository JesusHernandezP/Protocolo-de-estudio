export const DataService = {
  async getSubjects() {
    try {
      const response = await fetch('/data/subjects.json');
      return await response.json();
    } catch (error) {
      console.error('Error loading subjects:', error);
      return [];
    }
  },

  async getQuestions(moduleId) {
    try {
      const response = await fetch('/data/questions.json');
      const allQuestions = await response.json();
      return allQuestions.filter(q => q.moduleId === moduleId);
    } catch (error) {
      console.error('Error loading questions:', error);
      return [];
    }
  }
};
