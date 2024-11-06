export interface VisitedPlaylist {
	playlistId: string;
	date: Date;
}

export function pushVisitedPlaylistIds(playlistId: string) {
	const date = new Date();
	const visitedPlaylistIds = localStorage.getItem("visitedPlaylistIds");
	if (visitedPlaylistIds) {
		const newVisitedPlaylistIds: VisitedPlaylist[] =
			JSON.parse(visitedPlaylistIds);

		const playlistIds = newVisitedPlaylistIds.map(
			(item) => item.playlistId
		);
		if (playlistIds.includes(playlistId)) {
			newVisitedPlaylistIds.forEach((item) => {
				if (item.playlistId === playlistId) {
					item.date = date;
				}
			});
		} else {
			newVisitedPlaylistIds.push({ playlistId, date });
		}

		localStorage.setItem(
			"visitedPlaylistIds",
			JSON.stringify(newVisitedPlaylistIds)
		);
	} else {
		localStorage.setItem(
			"visitedPlaylistIds",
			JSON.stringify([{ playlistId, date }])
		);
	}
}

export function getVisitedPlaylistList(): VisitedPlaylist[] {
	const visitedPlaylistIds = localStorage.getItem("visitedPlaylistIds");
	if (!visitedPlaylistIds) {
		return [];
	}

	const visitedPlaylistListJson = JSON.parse(visitedPlaylistIds);

	const visitedPlaylist: VisitedPlaylist[] = visitedPlaylistListJson.map(
		(item: { playlistId: string; date: Date }) => ({
			playlistId: item.playlistId,
			date: new Date(item.date),
		})
	);

	return visitedPlaylist.sort((a, b) => b.date.getTime() - a.date.getTime());
}
