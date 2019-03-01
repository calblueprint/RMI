//takes in the ID of a specific category that we have selected and returns the questions associated with that category
//if no category is specified we return all of the questions
export function getQuestionsByCategory(categoryId, questions) {
  if (categoryId) {
    return questions.filter(question => {
      return question.category_id == categoryId;
    })
  }
  return questions;
}
