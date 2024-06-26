import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProfileModel } from "./Profile"

export const ProfileStoreModel = types.model("ProfileStore").props({
  profile: types.optional(ProfileModel, {}),
})

export interface ProfileStore extends Instance<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshot extends SnapshotOut<typeof ProfileStoreModel> {}
