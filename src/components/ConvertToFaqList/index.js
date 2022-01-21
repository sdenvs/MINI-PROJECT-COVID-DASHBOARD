const ConvertToFaqList = faq => {
  const faqKeys = Object.keys(faq)
  const faqList = []
  faqKeys.forEach(eachItem => {
    const qAndA = {
      question: faq[eachItem].question,
      answer: faq[eachItem].answer,
    }
    faqList.push(qAndA)
  })
  return faqList
}

export default ConvertToFaqList
