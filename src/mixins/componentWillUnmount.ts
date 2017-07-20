
/**
 * when componentWillUnmount
 * mounted set false
 */
export default function componentWillUnmount (this: any): void {
    this.mountedStatus = null;
}