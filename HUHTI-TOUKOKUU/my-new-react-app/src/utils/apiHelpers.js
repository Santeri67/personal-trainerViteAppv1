import axios from 'axios';

export const deleteTraining = async (trainingId) => {
    try {
        // Ensure URL is correctly formatted
        const response = await axios.delete(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${trainingId}`);
        return response;
    } catch (error) {
        console.error('Delete training error:', error);
        throw error;
    }
};
