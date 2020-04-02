const getters = {
    token: state => state.user.token,
    uservo: state => state.user.uservo,
    username: state => state.user.uservo.username,
    avatar: state => state.user.uservo.imagePath,
    logoImagePath: state => state.user.uservo.logoImagePath,
    phone: state => state.user.uservo.phone,
    customerName: state => state.user.uservo.customerName,
    permission_routes: state => state.permission.routes,
    permission_tree: state => state.permission.permissionTree,
    visited_views: state => state.tags.visitedViews,
    community_options: state => state.community.communityOptions,
    community_selected_id: state => state.community.communitySelected.communityId,
    community_selected_Name: state => state.community.communitySelected.communityName,
    community_selected_platformId: state => state.community.communitySelected.platformId
}
export default getters