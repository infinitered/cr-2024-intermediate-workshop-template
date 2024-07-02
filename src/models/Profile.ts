import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * This represents an user profile.
 */
export const ProfileModel = types
  .model("Profile")
  .props({
    name: "",
    location: "",
    yoe: "0",
    bio: "",
    openToWork: types.optional(types.boolean, false),
    remote: types.optional(types.boolean, false),
    skills: "",
    rnFamiliarity: types.optional(types.number, 0),
    darkMode: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)

export interface Profile extends Instance<typeof ProfileModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> {}
