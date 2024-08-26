import React, { useEffect, useState } from 'react';

//Modules and Libraries:
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

//APIs:
import { getJobsUploadedAPI } from '/src/apis/getJobsUploadedAPI';

//Compoennts:
import Navbar from "/src/components/Navbar";
import PaginationComponent from '/src/components/PaginationComponent';

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
                        </colgroup>
                        <tbody className={`${styles.tbody}`}>
                            {data && data.map((item, index) => (
                                <tr key={index} onClick={event => detailsHandler(event, item._id)}>
                                    <td>{item.counter}</td>
                                    <td>{item.title}</td>
                                    <td>{item.job_type}</td>
                                    <td>{item.sector}</td>
                                    <td>{item.location}</td>
                                    <td>{formatDate(item.date_posted)}</td>
                                    <td>{item.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.pagination}>
                    <PaginationComponent currentPage={currentPage} pageSize={pageSize} total={totalCount} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );        
};

export default JobsUploaded;