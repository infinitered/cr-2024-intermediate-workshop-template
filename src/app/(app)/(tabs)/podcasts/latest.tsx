import React from "react"
import { observer } from "mobx-react-lite"
import { Redirect } from 'expo-router';
import { useStores } from 'src/models';

export default observer(() => {
  const { episodeStore } = useStores();
  if (episodeStore.episodes.length > 0) {
    return <Redirect href={`/(app)/(tabs)/podcasts/${episodeStore.episodes.slice()[0].guid}`} />;
  }
  return <Redirect href={`/(app)/(tabs)/podcasts/`} />;;
});
