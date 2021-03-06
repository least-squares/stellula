Meteor.publish('livechat:visitorPageVisited', function(roomId) {
	if (!this.userId) {
		return this.error(new Meteor.Error('error-not-authorized', 'Not authorized', { publish: 'livechat:visitorPageVisited' }));
	}

	if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-rooms')) {
		return this.error(new Meteor.Error('error-not-authorized', 'Not authorized', { publish: 'livechat:visitorPageVisited' }));
	}

	var room = RocketChat.models.Rooms.findOneById(roomId);

	if (room && room.v && room.v.token) {
		return RocketChat.models.LivechatPageVisited.findByToken(room.v.token);
	} else {
		return this.ready();
	}
});
