
/**
 * hotLevel filter
 * @param {string} value值
 * @return {string} 中文
 */
export default function hotLevelFilter <T>(value: T): string {
    var data: any = {
        '1': 'EQR专题',
        '2': 'EQR常规',
        '3': '项目热点',
        '4': '售后EQR专题',
    }
    return data[value];
}