interface VisitedPlaylist {
    playlistId: string;
    date: Date;
}

export function pushVisitedPlaylistIds(playlistId: string) {
    const date = new Date()
    const visitedPlaylistIds = localStorage.getItem('visitedPlaylistIds')
    if (visitedPlaylistIds) {
        const newVisitedPlaylistIds: VisitedPlaylist[] = JSON.parse(visitedPlaylistIds)
        
        const playlistIds = newVisitedPlaylistIds.map((item) => item.playlistId)
        if (playlistIds.includes(playlistId)) {
            newVisitedPlaylistIds.forEach((item) => {
                if (item.playlistId === playlistId) {
                    item.date = date
                }
            })
        } else {
            newVisitedPlaylistIds.push({playlistId, date})
        }

        localStorage.setItem('visitedPlaylistIds', JSON.stringify(newVisitedPlaylistIds))
    } else {
        localStorage.setItem('visitedPlaylistIds', JSON.stringify([{playlistId, date}]))
    }
}

export function getVisitedPlaylistIds(): VisitedPlaylist[] {
    const visitedPlaylistIds = localStorage.getItem('visitedPlaylistIds')
    return visitedPlaylistIds ? JSON.parse(visitedPlaylistIds) : []
}