import axios from "axios";

export const addJobAPI = async (data, token) => {
    try {
        const response = await axios.post('http://localhost:5000/jobs/jobs', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Job posted successfully');
        console.log(response)
        return response.data;
    } catch (error) {
        console.error(error);
        console.log('Failed to post job');
        return {status: "error", error: "An error occurred. Please try again."}
    }
}