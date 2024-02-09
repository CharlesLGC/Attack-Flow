import { useEffect, useState, useRef } from 'react';
import { initFlowbite } from 'flowbite';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import PDFAnnotator from './PDFAnnotator/PDFAnnotator';
import NavBar from './NavBar';
import InviteCollaboratorsModal from './InviteCollaboratorsModal';

const Create = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [currentBlob, setCurrentBlob] = useState(null);
  const [highlightData, setHighlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCollaboratorsModal, setOpenCollaboratorsModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreateNodeView, setShowCreateNodeView] = useState(false);
  const [activeTab, setActiveTab] = useState('nodes');
  const menuButton = useRef(null);

  const openSideMenu = () => {
    menuButton.current.click();
  };

  const loadFile = async (url) => {
    // Parse the file name
    const projectFile = url.split('/').pop();
    const projectFileWithoutDate = projectFile.split('***').pop();
    setFileName(projectFileWithoutDate);

    try {
      const res = await axios({
        url: `${import.meta.env.VITE_APP_SERVER}/${url}`,
        method: 'GET',
        responseType: 'blob', // important
      });
      setCurrentBlob(res.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    async function getProject() {
      const accessToken = await getAccessTokenSilently();
      const res = await axios.get(
        `${import.meta.env.VITE_APP_SERVER}/attackflows/get?projectID=${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setProjectData(res.data[0]);

      // Load file if exists
      if (res.data[0].url != null) {
        loadFile(res.data[0].url);
      } else {
        setLoading(false);
      }
    }
    initFlowbite();
    getProject();
  }, [getAccessTokenSilently, id]);

  const uploadFile = async (file) => {
    const accessToken = await getAccessTokenSilently();
    const formData = new FormData();
    formData.append('file', file, `${Date.now()}***${file.name}`);

    setFileName(file.name);

    await axios.post(
      `${import.meta.env.VITE_APP_SERVER}/attackflows/upload-file/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      formData,
    );
  };

  const handleNodeDelete = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const blob = new Blob([selectedFile], { type: selectedFile.type });
    setCurrentBlob(blob);

    // Upload to backend
    uploadFile(e.target.files[0]);
  };
  return (
    <div>
      <InviteCollaboratorsModal
        open={openCollaboratorsModal}
        setOpen={setOpenCollaboratorsModal}
        projectID={id}
      />
      <NavBar currentRoute="/projects" />
      <div className="sticky top-0 w-full bg-[#111827] py-5 z-10 border-b border-gray-500  ">
        <div className="mx-auto max-w-7xl grid grid-cols-3">
          <div className="flex justify-start items-center">
            <input
              type="file"
              id="uploadFile"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="uploadFile"
              className="block flex text-sm mr-4 py-3 px-5 rounded-md border-0 text-sm font-semibold bg-primary-yellow text-black cursor-pointer hover:bg-opacity-80 items-center whitespace-nowrap"
            >
              Upload New File
            </label>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-white text-center text-lg items-center flex">
              {projectData ? projectData.title : ''}
            </p>
            {fileName !== '' ? (
              <p className="font-semibold text-gray-400 italic text-center text-xs items-center flex mt-1">
                {fileName}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end items-center">
            <button
              className="text-black bg-gray-200 hover:opacity-80 font-medium rounded-lg text-sm py-3 px-5 mr-4"
              onClick={() => setOpenCollaboratorsModal(true)}
            >
              Manage Collaborators
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm py-3 px-5 mr-2"
              type="button"
              data-drawer-target="drawer-right-example"
              data-drawer-show="drawer-right-example"
              data-drawer-backdrop="false"
              data-drawer-placement="right"
              aria-controls="drawer-right-example"
              id="menu_button"
              ref={menuButton}
            >
              Menu
            </button>
          </div>
        </div>
      </div>
      <div className="flex ">
        <MenuDrawer
          highlight={highlightData}
          onDeleteNode={handleNodeDelete}
          showCreateNodeView={showCreateNodeView}
          setShowCreateNodeView={setShowCreateNodeView}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <PDFAnnotator
          blob={currentBlob}
          onHighlight={setHighlightData}
          loading={loading}
          key={refreshKey}
          openSideMenu={() => {
            setActiveTab('nodes');
            openSideMenu(true);
          }}
          setShowCreateNodeView={setShowCreateNodeView}
        ></PDFAnnotator>
      </div>
    </div>
  );
};

export default Create;
