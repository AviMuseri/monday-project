import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { useEffect, useRef, useState } from "react"
import { addTask, setFilterBy } from "../store/actions/board.actions"
import { debounce } from "../services/util.service"
import { FilterModal } from "./FilterModal"



export function BoardDetailsFilter({ board, filterBy }) {
    const [isSearch, setIsSearch] = useState(false)
    const { boardId } = useParams()
    const [labelModal, setLabelModal] = useState(false)

    // const groups = useSelector((state) => state.groupModule.groups)
    const { groups } = board
    const modalBtnRef = useRef()



    async function onAddTaskClick() {
        await addTask(groups[0].id, { title: 'New task' })
    }

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    function onSubmitFilter(ev) {
        ev.preventDefault()
        // setFilterBy(filterByToEdit)
    }

    useEffect(() => {
        debounce(setFilterBy(filterByToEdit), 1000)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function toggleModal() {
        if (labelModal) setLabelModal(false)
        else setLabelModal(true)
    }

    const { title } = filterByToEdit

    return (
        <section className="board-details-filter">
            {location.pathname.includes('/board') && <div className="new-item">
                <button className="new-item-btn"
                    onClick={onAddTaskClick}
                >
                    New task
                </button>

            </div>}

            <div className="filters">
                <form onSubmit={onSubmitFilter} className="filter-form">
                    <div className={`name filter ${isSearch && 'open'}`}
                        style={{
                            backgroundColor: filterByToEdit && filterByToEdit.title && '#cce5ff'

                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-testid="icon" ><path d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                        <input type="text"
                            placeholder={isSearch ? "Search this board" : "Search"} onChange={handleChange} name="title" value={title}

                            onClick={() => setIsSearch(true)}
                            onBlur={() => setIsSearch(false)} />

                    </div>

                </form>


                {/* <div className="member filter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" data-testid="icon"><path d="M7.51318 5.43037C8.17316 4.77038 9.06829 4.39961 10.0017 4.39961C10.935 4.39961 11.8301 4.77038 12.4901 5.43037C13.1501 6.09035 13.5209 6.98548 13.5209 7.91884C13.5209 8.8522 13.1501 9.74733 12.4901 10.4073C11.8301 11.0673 10.935 11.4381 10.0017 11.4381C9.06829 11.4381 8.17316 11.0673 7.51318 10.4073C6.8532 9.74733 6.48242 8.8522 6.48242 7.91884C6.48242 6.98548 6.8532 6.09035 7.51318 5.43037ZM10.0017 5.89961C9.46612 5.89961 8.95252 6.11235 8.57384 6.49103C8.19516 6.86971 7.98242 7.38331 7.98242 7.91884C7.98242 8.45437 8.19516 8.96797 8.57384 9.34665C8.95252 9.72533 9.46612 9.93807 10.0017 9.93807C10.5372 9.93807 11.0508 9.72533 11.4295 9.34665C11.8081 8.96797 12.0209 8.45437 12.0209 7.91884C12.0209 7.38331 11.8081 6.86971 11.4295 6.49103C11.0508 6.11235 10.5372 5.89961 10.0017 5.89961Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /><path d="M10.0008 2.0498C7.89231 2.0498 5.8702 2.88739 4.37928 4.37831C2.88837 5.86922 2.05078 7.89133 2.05078 9.9998C2.05078 12.1083 2.88837 14.1304 4.37928 15.6213C4.50318 15.7452 4.63075 15.8646 4.76173 15.9794C4.77108 15.9879 4.78069 15.9963 4.79055 16.0045C6.23158 17.255 8.08036 17.9498 10.0008 17.9498C12.1093 17.9498 14.1314 17.1122 15.6223 15.6213C17.1132 14.1304 17.9508 12.1083 17.9508 9.9998C17.9508 7.89133 17.1132 5.86922 15.6223 4.37831C14.1314 2.88739 12.1093 2.0498 10.0008 2.0498ZM6.2925 15.2773C7.37119 16.0352 8.66461 16.4498 10.0008 16.4498C11.3369 16.4498 12.6302 16.0353 13.7088 15.2774C13.3315 14.8156 12.8699 14.4267 12.3466 14.1326C11.6302 13.73 10.8223 13.5186 10.0006 13.5186C9.17886 13.5186 8.37096 13.73 7.6546 14.1326C7.13136 14.4267 6.66982 14.8155 6.2925 15.2773ZM14.8283 14.2774C15.8706 13.1011 16.4508 11.5804 16.4508 9.9998C16.4508 8.28916 15.7712 6.64858 14.5616 5.43897C13.352 4.22936 11.7114 3.5498 10.0008 3.5498C8.29013 3.5498 6.64955 4.22936 5.43994 5.43897C4.23033 6.64858 3.55078 8.28916 3.55078 9.9998C3.55078 11.5803 4.13084 13.1009 5.17307 14.2772C5.66065 13.6931 6.25191 13.2003 6.91971 12.825C7.86047 12.2963 8.92145 12.0186 10.0006 12.0186C11.0797 12.0186 12.1407 12.2963 13.0815 12.825C13.7494 13.2003 14.3407 13.6932 14.8283 14.2774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                    <span>Person</span>
                </div> */}

                <div className={`main filter ${labelModal && 'active'}`}>
                    <div ref={modalBtnRef} onClick={toggleModal} >
                        <svg className="filter-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" role="img" aria-hidden="true"><path d="M17.8571 2.87669C18.107 3.41157 18.0246 4.04275 17.6457 4.49555L12.4892 10.6589V15.3856C12.4892 16.0185 12.097 16.5852 11.5048 16.8082L9.56669 17.5381C9.09976 17.7139 8.57627 17.6494 8.16598 17.3655C7.75569 17.0816 7.51084 16.6144 7.51084 16.1155V10.6589L2.35425 4.49555C1.97542 4.04275 1.89302 3.41157 2.14291 2.87669C2.39279 2.34182 2.92977 2 3.52013 2H16.4799C17.0702 2 17.6072 2.34182 17.8571 2.87669ZM16.4799 3.52012H3.52013L8.91611 9.96964C8.99036 10.0584 9.03096 10.1698 9.03096 10.2848V16.1155L10.969 15.3856V10.2848C10.969 10.1698 11.0096 10.0584 11.0839 9.96964L16.4799 3.52012Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                        <span>Filter</span>
                    </div>

                    {labelModal && <FilterModal setLabelModal={setLabelModal} labelModal={labelModal} modalBtnRef={modalBtnRef} />}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" data-testid="icon"><path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg> */}
                </div>

                <div className="sort filter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" data-testid="icon"><path d="M7.13869 2.75741C7.34727 2.75741 7.53593 2.84277 7.67174 2.98049L10.0716 5.38342C10.3641 5.67631 10.3641 6.15118 10.0716 6.44408 9.7791 6.73697 9.30483 6.73697 9.0123 6.44408L7.88775 5.3181V17.0578C7.88775 17.472 7.55238 17.8078 7.13869 17.8078 6.725 17.8078 6.38964 17.472 6.38964 17.0578V5.31805L5.26504 6.44408C4.97252 6.73697 4.49824 6.73697 4.20572 6.44408 3.9132 6.15118 3.9132 5.67631 4.20572 5.38342L6.60901 2.97708C6.62359 2.96249 6.63871 2.94855 6.65432 2.9353 6.78492 2.82434 6.954 2.75741 7.13869 2.75741zM14.4434 17.8075C14.652 17.8075 14.8406 17.7222 14.9764 17.5844L17.3763 15.1815C17.6688 14.8886 17.6688 14.4138 17.3763 14.1209 17.0838 13.828 16.6095 13.828 16.317 14.1209L15.1924 15.2468V3.50712C15.1924 3.09291 14.8571 2.75712 14.4434 2.75712 14.0297 2.75712 13.6943 3.09291 13.6943 3.50712V15.2469L12.5697 14.1209C12.2772 13.828 11.8029 13.828 11.5104 14.1209 11.2179 14.4138 11.2179 14.8886 11.5104 15.1815L13.9137 17.5879C13.9283 17.6025 13.9434 17.6164 13.959 17.6296 14.0896 17.7406 14.2587 17.8075 14.4434 17.8075z" fill="currentColor" /></svg>
                    <span>Sort</span>
                </div>

                {/* <div className="hide filter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" data-testid="icon"><path d="M5.4945 14.6105C5.21017 14.9117 5.22386 15.3864 5.52507 15.6707C5.82628 15.9551 6.30096 15.9414 6.58529 15.6402L7.55161 14.6165C8.33448 14.8828 9.1487 15.0351 9.97049 15.0229C12.868 15.0658 15.6721 13.0643 17.3405 11.2281L17.3427 11.2256L17.3623 11.204L17.3623 11.204C17.4409 11.1171 17.5695 10.9749 17.6759 10.8166C17.7887 10.6487 17.9414 10.3712 17.9414 10.0229C17.9414 9.6747 17.7887 9.39719 17.6759 9.22929C17.5695 9.07097 17.4409 8.92878 17.3623 8.84187L17.3427 8.82021L17.3427 8.8202L17.3403 8.81753C16.6909 8.10349 15.882 7.37801 14.9721 6.75535L16.2615 5.3894C16.5458 5.08819 16.5322 4.61351 16.231 4.32918C15.9297 4.04485 15.4551 4.05854 15.1707 4.35975L13.6515 5.96915C12.4945 5.38151 11.2365 5.00608 9.97049 5.02481C7.11928 4.98263 4.30864 6.93962 2.60229 8.81784L2.60228 8.81784L2.60015 8.82021C2.41883 9.02151 2.05859 9.45817 2.05859 10.0229C2.05859 10.5877 2.41883 11.0243 2.60015 11.2256L2.60014 11.2256L2.60213 11.2278C3.49368 12.2098 4.71006 13.239 6.09199 13.9775L5.4945 14.6105ZM8.7116 13.3876C9.12834 13.4816 9.54584 13.5299 9.95787 13.5229C9.96629 13.5228 9.9747 13.5228 9.98311 13.5229C12.2434 13.561 14.669 11.9372 16.2294 10.2205L16.2454 10.2027L16.2454 10.2026L16.2455 10.2026C16.2847 10.1591 16.3174 10.1227 16.3498 10.0846C16.3692 10.0617 16.3857 10.0413 16.3998 10.0229C16.3857 10.0046 16.3692 9.98412 16.3498 9.96127C16.3174 9.92311 16.2847 9.88677 16.2455 9.84329L16.2454 9.84321L16.2454 9.84316L16.2294 9.82549C15.5785 9.11 14.7875 8.42208 13.9283 7.86113L8.7116 13.3876ZM12.5698 7.11509C11.7158 6.73457 10.8338 6.51044 9.98314 6.5248C9.97471 6.52494 9.96628 6.52494 9.95784 6.5248C7.73795 6.48735 5.30526 8.07384 3.71366 9.82524C3.64791 9.89835 3.60189 9.96068 3.57471 10.0099L3.56783 10.0229L3.57471 10.0359C3.60191 10.0852 3.64796 10.1476 3.71376 10.2207C4.63358 11.2335 5.85484 12.214 7.16586 12.8399L8.22825 11.7144C8.21386 11.7021 8.19983 11.6891 8.1862 11.6754C7.84446 11.3336 7.61175 10.8981 7.5175 10.424C7.42324 9.94994 7.47168 9.45856 7.65669 9.012C7.84169 8.56544 8.15495 8.18377 8.55686 7.91524C8.95872 7.64675 9.43115 7.50343 9.91444 7.50339L10.2761 9.07519C10.1616 9.02776 10.0388 9.00336 9.91484 9.00339H9.91464C9.72794 9.00339 9.54542 9.05875 9.39018 9.16248C9.23493 9.2662 9.11393 9.41363 9.04247 9.58612C8.97101 9.75861 8.9523 9.94841 8.9887 10.1315C9.02511 10.3147 9.115 10.4829 9.247 10.6149C9.25029 10.6182 9.25355 10.6215 9.25676 10.6249L10.553 9.25167C10.4718 9.17719 10.3781 9.11743 10.2761 9.07519L9.91464 7.50339C10.2356 7.50333 10.5535 7.56652 10.8501 7.68934C11.1208 7.80144 11.3689 7.96121 11.5827 8.16084L12.5698 7.11509Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                    <span>Hide</span>
                </div>

                <div className="group filter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" data-testid="icon"><path d="M16 4.5H7.5L7.5 15.5H16C16.2761 15.5 16.5 15.2761 16.5 15V5C16.5 4.72386 16.2761 4.5 16 4.5ZM4 4.5H6L6 15.5H4C3.72386 15.5 3.5 15.2761 3.5 15V5C3.5 4.72386 3.72386 4.5 4 4.5ZM4 3C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4ZM15 14V9H9V14H15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                    <span>Group by</span>
                </div> */}

                {/* <div className="dots">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" role="img" aria-hidden="true"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" /></svg>
                    </button>
                </div> */}

            </div>

            {/* <div className="minimize-views">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" data-testid="icon"><path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                </button>
            </div> */}

        </section >
    )
}