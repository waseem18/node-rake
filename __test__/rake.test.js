import rake from '../app'

describe('rake', () => {

  it('can be imported', () => {
    expect(rake).toBeTruthy()
  })

  describe('generate', () => {

    let text = "LDA stands for Latent Dirichlet Allocation. As already mentioned it is one of the more popular topic models which was initially proposed by Blei, Ng and Jordan in 2003. It is a generative model which, according to Wikipedia, allows sets of observations to be explained by unobserved groups that explain why some parts of the data are similar."

    it('extracts keywords from text', () => {
      let results = rake.generate(text)
      expect(results.length).toEqual(18)
    })

    it('trims leading and trailing spaces from keywords', () => {
      let [firstKeyword, ...rest] = rake.generate(text)
      expect(firstKeyword).toEqual("Latent Dirichlet Allocation")
    })

    it("doesn't fail on text containing new lines", () => {
      let sketchyText = `

      Beyond the debateable minima already implied by the entrenchment of
      negative liberty, no further, more committal, theory of justice is constitutive of liberal
      order: indeed this is clearer than the analogous claim that democracy is not
      constitutive of liberal order.

      `
      let [firstKeyword, ...rest] = rake.generate(sketchyText)
      expect(firstKeyword).toEqual("debateable minima")
    })

  })

})
