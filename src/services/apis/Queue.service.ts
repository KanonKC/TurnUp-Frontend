import {
	QueueServiceAPI,
	QueueModel,
} from "@/types/apis/Queue.api";
import { ListAPIResponse } from "@/types/ListAPI";
import axios from "axios";
import { BACKEND_URL } from "./BackendURL";

export const QueueService: QueueServiceAPI = {
	getAll(playlistId) {
		return axios.get<ListAPIResponse<QueueModel[]>>(
			`${BACKEND_URL}/playlists/${playlistId}/queues`
		);
	},

	addVideo(playlistId, url) {
		return axios.post<QueueModel>(
			`${BACKEND_URL}/playlists/${playlistId}/queues`,
			{ videoId: url }
		);
	},

	clear(playlistId) {
		return axios.delete<null>(
			`${BACKEND_URL}/playlists/${playlistId}/queues`
		);
	},

	countUp(queueId) {
		return axios.put<QueueModel>(
			`${BACKEND_URL}/queues/${queueId}/increment`
		);
	},

	get(queueId) {
		return axios.delete<QueueModel>(
			`${BACKEND_URL}/queues/${queueId}`
		);
	},

	remove(queueId) {
		return axios.delete<null>(`${BACKEND_URL}/queues/${queueId}`);
	},

	reOrder(playlistId, payload) {
		return axios.patch<QueueModel[]>(
			`${BACKEND_URL}/playlists/${playlistId}/queues/order`,
			payload,
		);
	},
};
