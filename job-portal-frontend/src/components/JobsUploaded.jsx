import React, { useEffect, useState } from 'react';

//Modules and Libraries:
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

//APIs:
import { getJobsUploadedAPI } from '/src/apis/getJobsUploadedAPI';
import { deleteJobAPI } from '/src/apis/deleteJobAPI';

//Compoennts:
import Navbar from "/src/components/Navbar";
import PaginationComponent from '/src/components/PaginationComponent';
import Icon from "/src/icons/Icon";
//Modals:
import DeleteModal from '/src/components/Modals/DeleteModal';
import SuccessModal from "/src/components/Modals/SuccessModal";
import UnsuccessModal from "/src/components/Modals/UnsuccessModal";

//CSS:
import styles from "/src/styles/JobsUploaded.module.css";

const JobsUploaded = () => {
    const token = Cookies.get("token");

    const navigate = useNavigate();

    //States:
    const [data, setData] = useState([]);

    //Pagination:
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    //States for Delete Modal:
    const [isOpen, setIsOpen] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);

    //States for Unsucces Message Modal:
    const [isOpenUnsuccess, setIsOpenUnsuccess] = useState(false);

    //States for Succes Message Modal:
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);

    //Search query (will done the search based on the title):
    const [searchQuery, setSearchQuery] = useState("");

    //Functions:
    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize, totalCount]);

    //Getting list's data:
    const fetchData = async() => {
        const response = await getJobsUploadedAPI(token, 20, 1);
        if(response.status === 200) {
            setData(response.data.jobs);
            setTotalCount(response.data.total_count)
        } else {
            
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const detailsHandler = (event, id) => {
        event.preventDefault();
        navigate(`/jobs-uploaded/${id}`);
    };

    //Handling an item:
    const deleteHandler = async(id) => {
        const response = await deleteJobAPI(id, token);
        setSelectedInfo(null);
        setIsOpen(false);
        if(response.status === "success") {
            openSuccesModal();
            if(Math.floor((totalCount - 1) / pageSize) < currentPage) {
                setCurrentPage(Math.floor((totalCount - 1) / pageSize));
            }
            setTotalCount(prev => prev - 1);
            const newItems = data.filter((item) => item.id !== id);
            setData(newItems);
        } else {
            openUnsuccesModal();
        };
    };

    //Opening Delete Modal
    const openDeleteModal = (event, id) => {
        event.preventDefault();
        setSelectedInfo(id);
        setIsOpen(true);
    };

    //Opening Unsuccess Mesage Modal
    const openUnsuccesModal = () => {
        setIsOpenUnsuccess(true);
    };

    //Opening Success Mesage Modal
    const openSuccesModal = () => {
        setIsOpenSuccess(true);
    };

      return (
        <div>
            <Navbar />
            <div className={styles.content}>
                <h1>Jobs Uploaded</h1>
                <div className={styles.listContainer}>
                    <table className={`${styles.listHead} rounded`}>
                        <colgroup>
                            <col className={styles.col1} />
                            <col className={styles.col2} />
                            <col className={styles.col3} />
                            <col className={styles.col4} />
                            <col className={styles.col5} />
                            <col className={styles.col6} />
                            <col className={styles.col7} />
                            <col className={styles.col8} />
                        </colgroup>
                        <thead className={`${styles.thead} rounded`}>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Job Type</th>
                                <th>Sector</th>
                                <th>Location</th>
                                <th>Date Posted</th>
                                <th>Salary</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                    <table className={`${styles.listBody} rounded`}>
                        <colgroup>
                            <col className={styles.col1} />
                            <col className={styles.col2} />
                            <col className={styles.col3} />
                            <col className={styles.col4} />
                            <col className={styles.col5} />
                            <col className={styles.col6} />
                            <col className={styles.col7} />
                            <col className={styles.col8} />
                        </colgroup>
                        <tbody className={`${styles.tbody}`}>
                            {data && data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.counter}</td>
                                    <td>{item.title}</td>
                                    <td>{item.job_type}</td>
                                    <td>{item.sector}</td>
                                    <td>{item.location}</td>
                                    <td>{formatDate(item.date_posted)}</td>
                                    <td>{item.salary}</td>
                                    <td className={styles.iconContainer}>
                                        <div onClick={event => detailsHandler(event, item._id)}>
                                            <Icon icon="read-more" color="#003459" />
                                        </div>
                                        <div onClick={event => openDeleteModal(event, item._id)}>
                                            <Icon icon="delete" color="#FB5C5C" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.pagination}>
                    <PaginationComponent currentPage={currentPage} pageSize={pageSize} total={totalCount} onPageChange={handlePageChange} />
                </div>
            </div>
            <DeleteModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                deleteHandler={deleteHandler}
                selectedInfo={selectedInfo}
                setSelectedInfo={setSelectedInfo}
            />
            <UnsuccessModal isOpenUnsuccess={isOpenUnsuccess} setIsOpenUnsuccess={setIsOpenUnsuccess} />
            <SuccessModal isOpenSuccess={isOpenSuccess} setIsOpenSuccess={setIsOpenSuccess} type="delete" />
        </div>
    );        
};

export default JobsUploaded;