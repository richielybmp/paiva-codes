import React from 'react'
import { Link } from 'gatsby'

// Components
import BGImage from 'components/BGImage'
// Hooks
import useBannerQuery from 'hooks/useBannerQuery'
// Styles

const HomeBanner = () => {
    const { bannerImage, bannerImageText, bannerImageBtnText, bannerImageBtnLink } = useBannerQuery();

    return (
        <div>
            <BGImage title="Banner Image" fluid={bannerImage.childImageSharp.fluid}>
                <div>
                    <h2>{bannerImageText}</h2>
                </div>
                <Link to={bannerImageBtnLink}>
                    <button>{bannerImageBtnText}</button>
                </Link>
            </BGImage>
        </div>
    )
}

export default HomeBanner
