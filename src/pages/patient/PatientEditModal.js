import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
} from 'reactstrap';
import { toast } from 'react-toastify';

const PatientEditModal = ({
    isOpen,
    onClose,
    patient,
    onSave
}) => {
    const [editedPatient, setEditedPatient] = useState({
        id_card: '',
        patient_id: '',
        name: '',
        gender: true,
        phone: '',
        birth_date: '',
        address: ''
    });

    // Update local state when patient prop changes
    useEffect(() => {
        if (patient) {
            setEditedPatient({
                id_card: patient.id_card || '',
                patient_id: patient.patient_id || '',
                name: patient.name || '',
                gender: patient.gender !== undefined ? patient.gender : true,
                phone: patient.phone || '',
                birth_date: patient.birth_date
                    ? new Date(patient.birth_date).toISOString().split('T')[0]
                    : '',
                address: patient.address || ''
            });
        }
    }, [patient]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPatient(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        // Basic validation
        if (!editedPatient.name || !editedPatient.phone || !editedPatient.birth_date || !editedPatient.id_card) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/patients/${patient._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id_card: editedPatient.id_card,
                    name: editedPatient.name,
                    gender: editedPatient.gender,
                    birth_date: editedPatient.birth_date,
                    phone: editedPatient.phone,
                    address: editedPatient.address
                })
            });

            if (response.ok) {
                const updatedPatient = await response.json();
                toast.success('Cập nhật bệnh nhân thành công!', {
                    position: 'top-right',
                    autoClose: 1000
                });
                onSave(updatedPatient);
                onClose();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Lỗi khi cập nhật bệnh nhân!');
            }
        } catch (error) {
            toast.error('Lỗi kết nối đến server!');
            console.error('Error:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="lg">
            <ModalHeader toggle={onClose}>
                Chỉnh Sửa Thông Tin Bệnh Nhân
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Label sm={4}>CMND/CCCD</Label>
                        <Col sm={8}>
                            <Input
                                type="text"
                                name="id_card"
                                value={editedPatient.id_card}
                                onChange={handleInputChange}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Mã Bệnh Nhân</Label>
                        <Col sm={8}>
                            <Input
                                type="text"
                                name="patient_id"
                                value={editedPatient.patient_id}
                                disabled
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Tên</Label>
                        <Col sm={8}>
                            <Input
                                type="text"
                                name="name"
                                value={editedPatient.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Giới Tính</Label>
                        <Col sm={8}>
                            <Input
                                type="select"
                                name="gender"
                                value={editedPatient.gender.toString()}
                                onChange={(e) => setEditedPatient(prev => ({
                                    ...prev,
                                    gender: e.target.value === 'true'
                                }))}
                            >
                                <option value="true">Nam</option>
                                <option value="false">Nữ</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Số Điện Thoại</Label>
                        <Col sm={8}>
                            <Input
                                type="tel"
                                name="phone"
                                value={editedPatient.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Ngày Sinh</Label>
                        <Col sm={8}>
                            <Input
                                type="date"
                                name="birth_date"
                                value={editedPatient.birth_date}
                                onChange={handleInputChange}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Địa Chỉ</Label>
                        <Col sm={8}>
                            <Input
                                type="text"
                                name="address"
                                value={editedPatient.address}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    Thoát
                </Button>
                <Button color="primary" onClick={handleSave}>
                    Lưu Thay Đổi
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default PatientEditModal;