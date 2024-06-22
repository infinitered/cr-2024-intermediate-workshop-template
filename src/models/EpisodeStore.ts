import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { Episode, EpisodeModel } from "./Episode"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { updateEpisodesWidget } from "../widgets/widget-refresher"

export const EpisodeStoreModel = types
  .model("EpisodeStore")
  .props({
    episodes: types.array(EpisodeModel),
    favorites: types.array(types.reference(EpisodeModel)),
    favoritesOnly: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchEpisodes() {
      const response = await api.getEpisodes()
      if (response.kind === "ok") {
        store.setProp("episodes", response.episodes)
      } else {
        console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      }
    },
    addFavorite(episode: Episode) {
      store.favorites.push(episode)
      updateEpisodesWidget(store.favorites.slice())
    },
    removeFavorite(episode: Episode) {
      store.favorites.remove(episode)
      updateEpisodesWidget(store.favorites.slice())
    },
  }))
  .views((store) => ({
    get episodesForList() {
      return store.favoritesOnly ? store.favorites : store.episodes
    },

    hasFavorite(episode: Episode) {
      return store.favorites.includes(episode)
    },

    episodeById(guid: string) {
      return store.episodes.find((episode) => episode.guid === guid)
    },
  }))
  .actions((store) => ({
    toggleFavorite(episode: Episode) {
      if (store.hasFavorite(episode)) {
        store.removeFavorite(episode)
      } else {
        store.addFavorite(episode)
      }
    },
  }))

export interface EpisodeStore extends Instance<typeof EpisodeStoreModel> {}
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof EpisodeStoreModel> {}
