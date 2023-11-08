const subscribe = () => {
    if (!('Notification' in window)) {
        alert('알림을 지원하지 않는 데스크탑 브라우저입니다')
        return
    }

    if (Notification.permission === 'granted') {
        new Notification('안녕하세요!')
        return
    }

    if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification('알림이 구독되었습니다')
            }
        })
    }
}

export { subscribe }
