import { NumberStoreModel, NumberStore } from "./number-store"

test("can be created", () => {
  const instance: NumberStore = NumberStoreModel.create({})

  expect(instance).toBeTruthy()
})