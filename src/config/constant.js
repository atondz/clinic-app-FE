export const PAYMENT_STATUS = {
    WAITING: "WAITING",
    CHARGED: "CHARGED",
    CANCEL: "CANCEL"
}

export const PAYMENT_STATUS_MAPPING_VALUE = {
    WAITING: {
        name: "Chờ Thanh Toán",
        color: "warning"
    },
    CHARGED: {
        name: "Đã Thanh Toán",
        color: "success"
    },
    CANCEL: {
        name: "Đã Huỷ",
        color: "danger"
    }
}

export const ROLE_ACCESS = {
    ALL: 'ALL',
    DOCTOR: 'DOCTOR',
    STAFF: 'STAFF'
}