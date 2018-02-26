// class CategoryContainer extends React.Component {
//     componentDidMount() {
//         if (window.INITIAL_STATE) {
//             this.props.initActions.loadInitialState(window.INITIAL_STATE);
//         }
//     }
//     render() {
//
//
//     }
// }
//
//
//
// function mapStateToProps(state) {
//     return {
//         buildings: getBuildings(state),
//         currentBuilding: getNavBarBuildings(ownProps.match.params.entity, ownProps.match.params.id, state),
//         currentCategory: getCurrentCategory(ownProps.match.params.entity, ownProps.match.params.id, state),
//         categories:  getCategories(ownProps.match.params.entity, ownProps.match.params.id, state)
//         answers: getRemainingAnswers(getAnswers(ownProps.match.params.entity, ownProps.match.params.id, state))
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         initActions: bindActionCreators({ loadInitialState }, dispatch)
//     };
// }
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CategoryContainer);
