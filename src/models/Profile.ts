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
    yoe: "",
    bio: "",
    openToWork: types.optional(types.boolean, false),
    remote: types.optional(types.boolean, false),
    skills: types.optional(types.array(types.string), []),
    rnFamiliarity: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)

export interface Profile extends Instance<typeof ProfileModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> {}
