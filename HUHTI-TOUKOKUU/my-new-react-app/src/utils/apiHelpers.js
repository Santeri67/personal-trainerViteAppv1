import axios from 'axios';

export const deleteTraining = async (trainingId) => {
    if (!trainingId) {
        throw new Error("Training ID is undefined.");
    }

    return axios.delete(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${trainingId}`);
};
