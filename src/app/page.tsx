"use client";
import { useState } from 'react';
import {
    Box,
    Button,
    ChakraProvider,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react';

// Define la interfaz para un contacto
interface Contact {
    name: string;
    profession: string;
    phoneNumber: string;
    image: string;
}

function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contact, setContact] = useState<Contact>({
        name: '',
        profession: '',
        phoneNumber: '',
        image: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setContact(prevContact => ({
                    ...prevContact,
                    image: event.target?.result as string
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    const addContact = () => {
        if (contact.name && contact.profession && contact.phoneNumber && contact.image) {
            setContacts([...contacts, contact]);
            setContact({
                name: '',
                profession: '',
                phoneNumber: '',
                image: ''
            });
            closeModal();
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <ChakraProvider>
            <div className="App">
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Nuevo contacto</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={3}>
                                <Input
                                    placeholder="Nombre"
                                    name="name"
                                    value={contact.name}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    placeholder="Profesion"
                                    name="profession"
                                    value={contact.profession}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    placeholder="Telefono"
                                    name="phoneNumber"
                                    value={contact.phoneNumber}
                                    onChange={handleInputChange}
                                />
                                <Input type="file" accept="image/*" onChange={handleImageChange} />
                                <Button onClick={addContact} colorScheme="green">
                                    Agregar contacto
                                </Button>
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
                <div className="relative contact-list pb-6 w-96 mx-auto bg-gray-50 text-center rounded-md mt-4">
                    <h1 className="text-xl bg-green-500 text-amber-50 py-4 rounded-t-lg">Contactos</h1>
                    {contacts.map((contact, index) => (
                        <div key={index} className="contact-card px-6 py-6 mx-auto flex border-b-2 mb-4">
                            <div>
                                <div className="w-14 h-14">
                                    <img className=" aspect-square object-cover rounded-full" src={contact.image} alt={contact.name} />
                                </div>
                            </div>
                            <div className="text-left ml-4">
                                <h2 className="font-bold line-clamp-1">{contact.name}</h2>
                                <p className="text-gray-500 italic text-sm">{contact.profession}</p>
                                <div>
                                    <p className="text-gray-700 text-sm">{contact.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button className="absolute mt-4" onClick={openModal} colorScheme="green" size="sm" rounded="full">
                        +
                    </Button>
                </div>
            </div>
        </ChakraProvider>
    );
}

export default App;
