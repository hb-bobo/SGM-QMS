#模拟数据
```bash
fetch('local/getdata', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "path": "data.json"
    })
}).then((res) => {
    return res.json()
}).then((res) => {
    console.log(res)
})
```