import type { Ref } from "vue";
import { TransitionPresets, executeTransition } from "@vueuse/core";
import type { IMMusic } from "@/utils/types";
import { getTrackSrc } from "@/utils/song";
import useStore from "@/stores/main";

function useCurrentTime() {
  const displayCurrentTime = ref(0);
  const controlCurrentTime = ref(0);
  const currentTime = computed({
    get: () => displayCurrentTime.value,
    set: value => controlCurrentTime.value = value,
  });
  return { currentTime, displayCurrentTime, controlCurrentTime };
}

function updateEndTime(endTime: Ref<number>, trackDuration: Ref<number>, trackStart: number) {
  whenever(
    () => trackDuration.value > 0,
    () => endTime.value = Math.min(endTime.value === 0 ? Number.POSITIVE_INFINITY : endTime.value, trackDuration.value - trackStart),
    { once: true },
  );
}

const bindings: (() => void)[] = [];
function clearBindings() {
  let stop = bindings.pop();
  while (stop) {
    stop();
    stop = bindings.pop();
  }
}
function bindTrackPlaying(playing: Ref<boolean>, trackPlaying: Ref<boolean>) {
  bindings.push(syncRef(playing, trackPlaying, {
    direction: "ltr",
    immediate: true,
  }));
}
function bindTrackCurrentTime(displayCurrentTime: Ref<number>, controlCurrentTime: Ref<number>, trackCurrentTime: Ref<number>, trackStart: number) {
  bindings.push(syncRef(controlCurrentTime, trackCurrentTime, {
    direction: "ltr",
    transform: {
      ltr: l => l + trackStart,
    },
    immediate: true,
  }));
  bindings.push(syncRef(displayCurrentTime, trackCurrentTime, {
    direction: "rtl",
    transform: {
      rtl: r => r - trackStart,
    },
    immediate: true,
  }));
}
function bindScene(scene: Ref<string>, trackScene: string) {
  const trackVolumeWeight = ref(trackScene === scene.value ? 1 : 0);
  bindings.push(watch(
    scene,
    (scene) => {
      if (scene === trackScene) {
        executeTransition(trackVolumeWeight, trackVolumeWeight.value, 1, {
          duration: 1000 * (1 - trackVolumeWeight.value),
          transition: TransitionPresets.linear,
        });
      }
      else {
        executeTransition(trackVolumeWeight, trackVolumeWeight.value, 0, {
          duration: 1000 * trackVolumeWeight.value,
          transition: TransitionPresets.linear,
        });
      }
    },
  ));
  return { trackVolumeWeight };
}
function bindTrackVolume(volume: Ref<number>, trackVolume: Ref<number>, trackVolumeWeight: Ref<number>) {
  bindings.push(watch(
    [volume, trackVolumeWeight],
    () => trackVolume.value = volume.value * trackVolumeWeight.value,
    { immediate: true },
  ));
}

export function useInteractiveMusicControls(info: IMMusic, audios: Ref<HTMLAudioElement[]>) {
  const store = useStore();

  const trackControls = computed(() => audios.value.map(audio => useMediaControls(ref(audio))));

  const scene = computed({
    get: () => store.scene,
    set: scene => store.scene = scene,
  });
  const playing = ref(false);
  const { currentTime, displayCurrentTime, controlCurrentTime } = useCurrentTime();
  const volume = ref(1);
  const endTime = ref(0);

  watch(info, () => {
    if (!info.tracks.some(track => track.scene === scene.value)) {
      scene.value = info.tracks[0].scene;
    }
    playing.value = false;
    currentTime.value = 0;
    endTime.value = 0;
    clearBindings();

    nextTick(() => {
      audios.value.forEach((audioElement) => {
        const audio = ref(audioElement);
        const trackScene = audioElement.dataset.scene!;
        const track = info.tracks.find(t => t.scene === trackScene)!;
        const trackStart = track.start;

        const {
          duration: trackDuration,
          playing: trackPlaying,
          currentTime: trackCurrentTime,
          volume: trackVolume,
        } = useMediaControls(audio, { src: getTrackSrc(track.links) });

        updateEndTime(endTime, trackDuration, trackStart);
        bindTrackPlaying(playing, trackPlaying);
        bindTrackCurrentTime(displayCurrentTime, controlCurrentTime, trackCurrentTime, trackStart);
        const { trackVolumeWeight } = bindScene(scene, trackScene);
        bindTrackVolume(volume, trackVolume, trackVolumeWeight);
      });
    });
  }, { immediate: true });

  whenever(
    () => endTime.value > 0 && currentTime.value >= endTime.value,
    () => {
      playing.value = false;
      currentTime.value = 0;
    },
  );

  return {
    scene,
    playing,
    currentTime,
    endTime,
    volume,
    trackControls,
  };
}
