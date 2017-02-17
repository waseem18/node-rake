import rake from '../app'

describe('rake', () => {

  it('can be imported', () => {
    expect(rake).toBeTruthy()
  })

  describe('generate', () => {

    it('extracts keywords from text', () => {

      let text = "LDA stands for Latent Dirichlet Allocation. As already mentioned it is one of the more popular topic models which was initially proposed by Blei, Ng and Jordan in 2003. It is a generative model which, according to Wikipedia, allows sets of observations to be explained by unobserved groups that explain why some parts of the data are similar."

      let results = rake.generate(text)
      expect(results.length).toEqual(18)
    })

  })

})
