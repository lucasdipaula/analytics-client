import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { getSiteAccess } from '../../service/Site';
import AccessTable from '../../components/AccessTable';

const Dashboard = (props) => {
    const styles = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [access, setAccess] = useState([]);
    const { siteUrl } = props.loggedUser.user;

    useEffect(async () => {
        async function getAccess() {
            return await getSiteAccess({
                mainDomain: siteUrl,
            });
        }
        const info = await getAccess();
        setAccess(info);
        setIsLoading(false);
    }, []);

    return (
        <div className={styles.container}>
            <p className={styles.title}>{`Dados de ${siteUrl}`}</p>
            <h3>{'Cole esse snippet em seu arquivo html: '}</h3>
            <code>{'<script src="https://analytics-tool-script.web.app/analytics.js"></script>'}</code>
            <div style={{ marginTop: 10 }} />
            <div className={styles.divider} />
            <div className={styles.content}>
                <p className={styles.text}>{`Quantidade de acessos: ${access.length}`}</p>
            </div>
            <div style={{ marginTop: 50 }}>
                {!isLoading &&
                    <AccessTable access={access} />
                }
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',
        borderWidth: '20px',
        borderStyle: 'solid',
        borderColor: 'black',
        height: '100vh'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '28px',
    },
    text: {
        fontWeight: 'bold',
        fontSize: '22px',
    },
    content: {
        marginTop: '100px'
    },
    divider: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'black',
    }
}));

export default Dashboard;