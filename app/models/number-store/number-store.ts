import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const NumberStoreModel = types
  .model("NumberStore")
  .props({
    chosen : types.maybe(types.number),
    random : types.maybe(types.number),
    number1 : types.maybe(types.number),
    number2 : types.maybe(types.number),
    list : types.array(types.number),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getRandomNumber(){
      self.random = Math.floor(Math.random() * (self.number2 - self.number1 + 1)) + self.number1;
    },
    setRandom(num){
      self.random = num;
    },
    setChosen(num){
      self.chosen = num;
    },
    setNumber1(num){
      self.number1 = num + 1;
    },
    setNumber2(num){
      self.number2 = num - 1 ;
    },
    addNumber(num){
      self.list.push(num);
    },
    clear(){
      self.chosen = undefined ;
      self.random = undefined;
      self.number1 = undefined;
      self.number2 = undefined;
      self.list = undefined;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type NumberStoreType = Instance<typeof NumberStoreModel>
export interface NumberStore extends NumberStoreType {}
type NumberStoreSnapshotType = SnapshotOut<typeof NumberStoreModel>
export interface NumberStoreSnapshot extends NumberStoreSnapshotType {}
