
export default function loadingMore (this: any) {
    if (this.state.scrollConfig.upContent === 'No More') {
        // 上拉结束
        if (this.refs.scroller !== undefined) { this.refs.scroller.donePullup() }
        return;
    }
    this.getListData('up');
}