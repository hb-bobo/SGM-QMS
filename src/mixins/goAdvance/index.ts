
/**
 * 跳到推进页面
 * @param type 
 * @param problemId 
 */
export default function goAdvance (this: any, type: string, problemId: string): void {
    console.log(this)
    if (type) {
        this.props.history.push('/search/issue-advance/' + type + `?problemId=${problemId}`);
        this.setState({
            isIndex: false
        });
    }
}