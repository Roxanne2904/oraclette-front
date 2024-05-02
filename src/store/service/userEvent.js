export const userEventsService = {
	backToFront: (userEvents, currentUserId) =>
		userEvents.filter((userEvents) =>
			userEvents.participants.find((participant) => {
				const isCurrentUser =
					participant.id === currentUserId;
				const isNotBan =
					participant.EventRegister.status !==
					"banned";

				return isCurrentUser && isNotBan;
			})
		),
};
