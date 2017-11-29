//
//  ViewController.swift
//  iot-auth
//
//  Created by Gavin Smith on 11/28/17.
//  Copyright © 2017 Gavin Smith. All rights reserved.
//

import UIKit
import QRCodeReader

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    lazy var qrCodeReaderVC: QRCodeReaderViewController = {
        let builder = QRCodeReaderViewControllerBuilder {
            $0.reader = QRCodeReader(
                metadataObjectTypes: [.qr],
                captureDevicePosition: .back
            )
        }
        return QRCodeReaderViewController(builder: builder)
    }()
    
    @IBAction func authenticate() {
        qrCodeReaderVC.delegate = self
        qrCodeReaderVC.modalPresentationStyle = .formSheet
        present(qrCodeReaderVC, animated: true)
    }
}

extension ViewController: QRCodeReaderViewControllerDelegate {
    func reader(_ reader: QRCodeReaderViewController, didScanResult result: QRCodeReaderResult) {
        reader.stopScanning()
        print("result: \(result.value) (\(result.metadataType)")
        dismiss(animated: true)
    }
    
    func readerDidCancel(_ reader: QRCodeReaderViewController) {
        reader.stopScanning()
        print("canceled")
        dismiss(animated: true)
    }
}
