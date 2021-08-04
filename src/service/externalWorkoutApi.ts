import { WorkoutExternalApi } from '@prisma/client';
import axios from 'axios';
import { Workout } from '../schema/Workout';
import { WorkoutSection } from '../schema/WorkoutSection';
import { SupportedExternalWorkoutApi } from '../types/workoutTypes';

export const externalWorkoutApi = async (
  apiInfo: WorkoutExternalApi | null
) => {
  if (!apiInfo) return null;

  switch (apiInfo.type) {
    case SupportedExternalWorkoutApi.SUGARWOD:
      return sugarwodWorkoutApi(apiInfo);
    default:
      throw new Error('Something went wrong!');
  }
};

const sugarwodWorkoutApi = async (apiInfo: WorkoutExternalApi) => {
  const { token, endpoint } = apiInfo;
  try {
    const {
      data: { data: classes },
    } = await axios.get(`${endpoint}/workouts?track_id=Bqa3xMy0rV`, {
      headers: {
        Authorization: token,
      },
    });
    const workouts = classes.map((workouts: any, i: number) => {
      const { title, description } = workouts.attributes;
      return {
        title,
        body: description,
        order: i++,
      } as WorkoutSection;
    });
    return {
      externalApiProvider: SupportedExternalWorkoutApi.SUGARWOD,
      type: 'Crossfit',
      workoutSection: workouts,
    } as Workout;
  } catch (error) {
    console.log('Sugarwod workout api error', error);
    return null;
  }
};
