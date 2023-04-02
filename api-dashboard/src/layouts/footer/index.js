import React, { Fragment } from "react";

function Footer(props) {
    return (
        <Fragment>
            <footer id="footer" className="dashboard-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 subject">
                            <h4>Trường Đại Học Sư Phạm Kỹ Thuật TP.HCM</h4>
                            <p>
                                &copy; 2023 Nhóm 8 Lớp Công cụ và Môi trường
                                phát triển phần mềm 01.
                            </p>
                            <p>GVHD: Huỳnh Xuân Phụng</p>
                        </div>
                        <div className="col-md-6 text-right">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Design by:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Nguyễn Đức Hiển</td>
                                        <td>20110643</td>
                                    </tr>
                                    <tr>
                                        <td>Võ Ngọc Quý</td>
                                        <td>20110709</td>
                                    </tr>
                                    <tr>
                                        <td>Lê Quang Tùng</td>
                                        <td>20110746</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
}

export default Footer;
