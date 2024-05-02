const fromBackToFront = (msg, currentUserId) => {
	const { user, event } = msg;

	const isItMyMessage = currentUserId === msg.user_id;
	const canIDelete = currentUserId === event.user_id;

	const createAtTimestamp = new Date(msg.createdAt).getTime();
	const updatedAtTimestamp = new Date(msg.updatedAt).getTime();

	return {
		createdAt: new Date(msg.createdAt).toLocaleDateString(),
		disabled: msg.disabled,
		eventId: msg.event_id,
		id: msg.id,
		message: msg.message,
		updatedAt: new Date(msg.updatedAt).toLocaleDateString(),
		writedBy:
			currentUserId === msg.user_id
				? "Vous"
				: `${user.lastname} ${user.firstname}`,
		isItMyMessage,
		canIDelete,
		eventCreator: event.user_id,
		hasBeenUpdated: createAtTimestamp !== updatedAtTimestamp,
	};
};

export const messageService = (data, currentUserId) => {
	return data.map((message) => fromBackToFront(message, currentUserId));
};
