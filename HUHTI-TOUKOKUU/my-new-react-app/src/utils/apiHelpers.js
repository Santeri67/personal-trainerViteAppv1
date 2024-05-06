import axios from 'axios';

export const deleteTraining = async (trainingId) => {
    if (!trainingId) {
        throw new Error("Training ID is undefined.");  // Ensure the caller handles this error.
    }
    // Directly return the axios call. Let the caller handle any errors.
    return axios.delete(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${trainingId}`);
};
