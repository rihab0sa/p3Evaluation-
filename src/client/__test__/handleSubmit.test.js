
const { handleSubmit } = require("./src/client/js/handleSubmit.js")

describe('handleSubmit is vaild', ()=> {
    it('returns something', () => {
        expect(handleSubmit).toBeDefined();
    })
})